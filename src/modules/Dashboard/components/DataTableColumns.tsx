import { ColumnDef } from "@tanstack/react-table";
import { Property } from "./types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";

const getColumns = (
  setSelectedProperties: (properties: Property[]) => void
): ColumnDef<Property>[] => [
  {
    id: "selection",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={row.getToggleSelectedHandler()}
      />
    ),
  },
  {
    accessorKey: "id",
    header: "Property ID",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <select defaultValue={row.original.status} className="border p-1 rounded">
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    ),
  },
  {
    accessorKey: "photo",
    header: "Photo",
    cell: ({ row }) => (
      <div>
        <img
          src={row.original.photo}
          alt={row.original.name}
          className="h-10 w-10"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name of Property",
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => <div>{row.original.address}</div>,
  },
  {
    accessorKey: "latitude",
    header: "Latitude",
    cell: ({ row }) => <div>{row.original.latitude}</div>,
  },
  {
    accessorKey: "longitude",
    header: "Longitude",
    cell: ({ row }) => <div>{row.original.longitude}</div>,
  },
  {
    accessorKey: "carpetArea",
    header: () => (
      <Tooltip>
        <TooltipTrigger>
          <div>Carpet Area ⓘ</div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Carpet Area is the area enclosed within the walls.</p>
        </TooltipContent>
      </Tooltip>
    ),
    cell: ({ row }) => <div>{row.original.carpetArea}</div>,
  },

  {
    accessorKey: "superBuiltUpArea",
    header: () => (
      <Tooltip>
        <TooltipTrigger>
          <div>Super Built Up Area ⓘ</div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            Super Built Up Area includes the carpet area plus the area occupied
            by the walls, and the area occupied by common/shared construction.
          </p>
        </TooltipContent>
      </Tooltip>
    ),
    cell: ({ row }) => <div>{row.original.superBuiltUpArea}</div>,
  },
  {
    accessorKey: "pincode",
    header: "Pincode",
    cell: ({ row }) => <div>{row.original.pincode}</div>,
  },
  {
    accessorKey: "state",
    header: "State",
    cell: ({ row }) => <div>{row.original.state}</div>,
  },
];

export default getColumns;
