"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface MyAlertDialogProps {
  songLyrics?: string[];
  sotd: string;
}

function MyAlertDialog(props: MyAlertDialogProps) {
  const [currentLyric, setCurrentLyric] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    console.log("open");
    setOpen(true);
  };
  console.log(props.sotd);
  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  // const handleContinue = () => {
  //   console.log("continue");
  //   if (currentLyric < props?.songLyrics?.length - 1) {
  //     setCurrentLyric(currentLyric + 1);
  //   } else {
  //     handleClose();
  //   }
  // };

  return (
    <>
      {/* <Button variant={"outline"} onClick={handleOpen}>
        open
      </Button> */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        {/* <AlertDialogTrigger asChild>
          <Button variant="outline" onClick={handleOpen}>
            Open
          </Button>
        </AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>First Dialog</AlertDialogTitle>
            <AlertDialogDescription>{props.sotd}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default MyAlertDialog;
