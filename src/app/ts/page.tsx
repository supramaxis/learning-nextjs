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
import { useEffect, useRef, useState } from "react";

interface MyAlertDialogProps {
  songLyrics: string[];
}

function TSongs(props: MyAlertDialogProps) {
  const songLyrics = [
    //taylor swift enchanted
    "There I was again tonight",
    "Forcing laughter, faking smiles",
    "Same old tired lonely place",
    "Walls of insincerity",
    "Shifting eyes and vacancy",
    "Vanished when I saw your face",
    "All I can say is it was enchanting to meet you",
    "Your eyes whispered, 'Have we met?'",
    "Across the room your silhouette",
    "Starts to make its way to me",
    "The playful conversation starts",
    "Counter all your quick remarks",
    "Like passing notes in secrecy",
    "And it was enchanting to meet you",
    "All I can say is I was enchanted to meet you",
    "This night is sparkling, don't you let it go",
    "I'm wonderstruck, blushing all the way home",
    "I'll spend forever wondering if you knew",
    "I was enchanted to meet you",
    "The lingering question kept me up",
    "2 AM, who do you love?",
    "I wonder 'til I'm wide awake",
    "And now I'm pacing back and forth",
    "Wishing you were at my door",
    "I'd open up and you would say, 'Hey, it was enchanting to meet you'",
    "All I know is I was enchanted to meet you",
    "This night is sparkling, don't you let it go",
    "I'm wonderstruck, blushing all the way home",
    "I'll spend forever wondering if you knew",
    "This night is flawless, don't you let it go",
    "I'm wonderstruck, dancing around all alone",
    "I'll spend forever wondering if you knew",
    "I was enchanted to meet you",
    "This is me praying that",
    "This was the very first page",
    "Not where the story line ends",
    "My thoughts will echo your name",
    "Until I see you again",
    "These are the words I held back",
    "As I was leaving too soon",
    "I was enchanted to meet you",
    "Please don't be in love with someone else",
    "Please don't have somebody waiting on you",
    "Please don't be in love with someone else",
    "Please don't have somebody waiting on you",
    "This night is sparkling, don't you let it go",
    "I'm wonderstruck, blushing all the way home",
    "I'll spend forever wondering if you knew",
    "This night is flawless, don't you let it go",
    "I'm wonderstruck, dancing around all alone",
    "I'll spend forever wondering if you knew",
    "I was enchanted to meet you",
    "Please don't be in love with someone else",
    "Please don't have somebody waiting on you",
  ];
  const [currentLyric, setCurrentLyric] = useState(0);
  const [clickable, setClickable] = useState(true);
  const [open, setOpen] = useState(false);
  const intervalRef = useRef<any>();
  const handleOpen = () => {
    console.log("open");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleContinue = () => {
    if (currentLyric < songLyrics.length - 1) {
      setCurrentLyric(currentLyric + 1);
      setClickable(false);
    } else {
      handleClose();
    }
  };
  useEffect(() => {
    if (!clickable) {
      intervalRef.current = setInterval(() => {
        setClickable(true);
        clearInterval(intervalRef.current);
      }, 300);
    }
  }, [clickable]);

  return (
    <>
      {/* <Button variant="outline" onClick={handleOpen}>
        open
      </Button> */}
      <div className="flex justify-center  items-center h-screen">
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="default"
              onClick={() => {
                setOpen(true);
              }}
            >
              Comenzar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="select-none">
            <AlertDialogHeader>
              <AlertDialogTitle>Mi cancion</AlertDialogTitle>
              <AlertDialogDescription>
                {songLyrics[currentLyric]}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                variant="default"
                disabled={!clickable}
                onClick={handleContinue}
                className="select-none"
              >
                Continue
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}

export default TSongs;
