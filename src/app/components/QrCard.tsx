import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";

interface QrCardProps {
  qrCodeData: any;
}

const QrCard = ({ qrCodeData }: QrCardProps) => {

  if(!qrCodeData) return null;

  return (
    <>
      <Dialog defaultOpen>
        {/* <DialogTrigger asChild>
            <Button onClick={handleOpenDialog}>Generate QR Code</Button>
        </DialogTrigger> */}
        {/* {showDialog && ( */}
        <DialogContent className="sm:max-w-[320px]">
          <DialogHeader>
            <div className="flex justify-center items-center ">
              <DialogTitle>Your QR Code</DialogTitle>
            </div>
            <div className="flex justify-center items-center ">
              <DialogDescription>
                This is your generated QR Code
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="flex justify-center items-center ">
            <div className="grid gap-4">
              <Image src={qrCodeData} width={150} height={150} alt="QR Code" />
            </div>
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>

        {/* )} */}
      </Dialog>
    </>
  );
};

export default QrCard;
