"use client";

import React, { useEffect, useMemo, useCallback, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcons";
import { columns } from "./data";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "@/app/redux/userApiSlice";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import AddNewModal from "./addNewModal";
import EditUserModal from "./editUserModal";

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "first_name",
  "email",
  "actions",
  "update",
];

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string; // Change 'avatar' to 'avatar_url'
};

export default function UserTable() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const [users, setUsers] = React.useState<User[]>([]);

  const { data: apiResponse, error, isLoading } = useGetUsersQuery({});

  const [deleteUser, { isLoading: loading, isError }] = useDeleteUserMutation();

  const [isComponentVisible, setComponentVisibility] = useState(false);

  const handleClick = () => {
    // Set the state to true to make the component visible
    setComponentVisibility(true);
  };

  const deleteUserApi = async (userId: number) => {
    const url = `https://reqres.in/api/users/${userId}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if required
        },
        // You can include a request body if needed
        // body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete user. Status: ${response.status}`);
      }

      console.log("User deleted successfully");
      toast.success("User deleted");
    } catch (error) {
      console.error("Error deleting user:");
    }
  };

  useEffect(() => {
    if (error) {
      console.error("Error deleting user:", error);
    }

    if (apiResponse) {
      const deletedUserId = apiResponse.data.id;

      // Filter out the deleted user from the state
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== deletedUserId)
      );

      console.log("User deleted successfully");
    }
  }, [apiResponse, error]);

  useEffect(() => {
    // Handle the error if any
    if (error) {
      console.error("Error fetching data:", error);
    }

    // Update the users state if data is available
    if (apiResponse) {
      setUsers(apiResponse.data);
    }
  }, [apiResponse, error]);

  const pages = useMemo(
    () => Math.ceil(users.length / rowsPerPage),
    [users.length, rowsPerPage]
  );

  const hasSearchFilter = useMemo(() => Boolean(filterValue), [filterValue]);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.first_name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [users, filterValue, hasSearchFilter]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, rowsPerPage, filteredItems]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User];
      const second = b[sortDescriptor.column as keyof User];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [items, sortDescriptor]);

  const renderCell = useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "first_name":
        return (
          <User
            avatarProps={{ radius: "full", size: "sm", src: user.avatar }}
            classNames={{
              description: "text-default-500",
            }}
            name={cellValue}
          ></User>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  onClick={() => {
                    deleteUserApi(user.id);
                  }}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      case "update":
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              // Handle update logic here
              console.log("Update clicked for user:", user);
            }}
          >
            <EditUserModal userId={user.id}></EditUserModal>
          </Button>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="">
            <p>
              <AddNewModal></AddNewModal>
            </p>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-blue-500 text-white",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  );

  return (
    <>
      <Table
        isCompact
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={classNames}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              className="bg-[#FAFBFC]"
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Toaster />
    </>
  );
}
