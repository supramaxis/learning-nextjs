"use client";
import React, { useState } from "react";

import { UrlsModalProps } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "react-hot-toast";
const FormSchema = z.object({
  url: z.string().url({
    message: "Please enter a valid URL.",
  }),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/i, {
      message:
        "Please enter a valid slug using only lowercase letters, numbers or hyphens.",
    })
    .optional(),
});

const UrlsModal: React.FC<UrlsModalProps> = ({ onUrlCreated }) => {
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  // function isValidURL(url: string): boolean {
  //   try {
  //     new URL(url);
  //     return true;
  //   } catch (e) {
  //     return false;
  //   }
  // }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmitForm = form.handleSubmit(
    async (data: z.infer<typeof FormSchema>) => {
      try {
        setLoading(true);
        // e.preventDefault();
        const url = data.url;
        const customCode = data.slug || "";

        //fetch the api endpoint to create a short url using async await

        const res = await fetch("/api/shorten", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url, customCode }),
        });
        const resultData = await res.json();

        if (resultData.error) {
          toast.error("Error creating short url" + resultData.error.message);
          console.log(resultData.error);
          return;
        }

        setLoading(false);
        onUrlCreated(resultData);
        setShowDialog(false);
      } catch (error) {
        console.log(error);
      }
    }
  );

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={() => setShowDialog(true)} variant="outline">
            Crear Enlaces
          </Button>
        </DialogTrigger>
        {showDialog && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Acortar Enlaces</DialogTitle>
              <DialogDescription>
                Crea enlaces cortos para compartir rapidamente
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center items-center ">
              <div className="grid gap-4 py-4 ">
                <Form {...form}>
                  <form
                    onSubmit={onSubmitForm}
                    className="space-y-8 flex flex-col"
                  >
                    <FormField
                      control={form.control}
                      name="url"
                      render={({ field }) => (
                        <>
                          <FormItem>
                            <FormLabel>URL</FormLabel>
                            <FormControl>
                              <Input placeholder="A Long URL" {...field} />
                            </FormControl>
                            <FormDescription>
                              Enter a valid URL to shorten
                            </FormDescription>
                          </FormItem>
                        </>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <>
                          <FormItem>
                            <FormLabel>Codigo personalizado</FormLabel>
                            <FormControl>
                              <Input placeholder="Short Code" {...field} />
                            </FormControl>
                            <FormDescription>
                              Crea un codigo personalizado para este enlace
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        </>
                      )}
                    />
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </div>
            </div>
            <DialogFooter></DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default UrlsModal;
