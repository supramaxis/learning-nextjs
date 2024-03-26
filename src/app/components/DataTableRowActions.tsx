import { useState } from "react";
import axios from "axios";
import { Row } from "@tanstack/react-table";
import { toast } from "react-hot-toast";
import { mutate } from "swr";
import { useUrlStore } from "@/store/urls-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuMoreHorizontal, LuArrowDown, LuExternalLink } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import QrCard from "./QrCard";
import QRCode from "qrcode";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

const ActionsCell = <TData,>({ row }: DataTableRowActionsProps<TData>) => {
  const [showQrCard, setShowQrCard] = useState(false);
  const [qrCodeLink, setQRCodeLink] = useState("");
  const { id } = row.original as Row<TData>;

  const handleCreateQR = async () => {
    try {
      const res = await axios.get(`/api/get/url/${id}`);
      const ogUrl = res.data;
      const url = await QRCode.toDataURL(ogUrl);
      setQRCodeLink(url);
    } catch (error) {
      console.log(error);
    }
    setShowQrCard(true);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/delete/${id}`);
      console.log(res.data);
      toast.success("Url has been deleted");
      mutate("/api/get/urls");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <LuMoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer" onClick={handleDelete}>
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={handleCreateQR}>
            Create QR Code
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {showQrCard && <QrCard qrCodeLink={qrCodeLink} />}
    </>
  );
};

export default ActionsCell;
