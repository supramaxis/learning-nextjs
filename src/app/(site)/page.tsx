/**
 * Renders the Shorten page, which allows users to shorten URLs and view a list of their shortened URLs.
 * Uses the `UrlsContext` to retrieve the list of URLs and the `UrlsModal` component to create new URLs.
 * Redirects to the login page if the user is not authenticated.
 * @returns A React component that renders the Shorten page.
 *
 */

// shorten.tsx
"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import NavigationMenuBar from "@/(site)/components/NavBar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { useUrlsStore } from "@/store/urls-store";

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

export default function Shorten() {
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [urlMapping, setUrlMapping] = useState({});

  const { setUrl } = useUrlsStore();

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(newUrl);
      console.log("copied");
    } catch (error) {
      console.log("Error copying link:", error);
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmitForm = form.handleSubmit(
    async (data: z.infer<typeof FormSchema>) => {
      try {
        setLoading(true);
        const url = data.url;
        const customCode = data.slug || "";

        //fetch the api endpoint to create a short url using async await

        const res = await fetch("/api/demo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        });

        const resultData = await res.json();
        console.log("resultData", resultData);
        if (resultData.code === "P2025") {
          toast.error("Not found in database: " + resultData.code);
          console.log(resultData.meta);
          return;
        }
        if (resultData.error) {
          toast.error("Error creating short url:" + resultData.error.message);
          console.log(resultData.error);
          return;
        }
        if (res.status === 200) {
          setIsOpen(true);
          const newUrl = `${window.location.origin}/demo/go/${resultData.slug}`;
          setNewUrl(newUrl);

          sessionStorage.setItem(resultData.slug, resultData.url);

        } else {
          console.error("POST /api/demo failed", res);
        }
        
        
        
        setUrl(resultData.url);
        console.log("STORE URL: ", url);
        console.log("newUrl", newUrl);
        setUrlMapping(prevMapping => ({ ...prevMapping, [resultData.slug]: resultData.url }));

        setLoading(false);
        // onUrlCreated(resultData);
        setShowDialog(false);
        form.reset();
      } catch (error: any) {
        console.error(error);
        setLoading(false);
        toast.error("Error creating short url" + error.message);
      }
    }
  );

  return (
    <>
      <NavigationMenuBar />
      <div className="text-zinc-200">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <h1 className="text-3xl font-bold text-zinc-200">
            Shorten your links
          </h1>
        </main>

        <div className="flex justify-center items-center">
          <div className="py-36">
            <Form {...form}>
              <form onSubmit={onSubmitForm} className="space-y-8 flex flex-col">
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
                <Button type="submit">Submit</Button>
              </form>
            </Form>
            <>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                {/* <DialogTrigger asChild>
                  <Button variant="outline">Share</Button>
                </DialogTrigger> */}
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                      Anyone who has this link will be able to view this.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                      <Label htmlFor="link" className="sr-only">
                        Link
                      </Label>
                      <Input id="link" defaultValue={newUrl} readOnly />
                    </div>
                    <Button
                      onClick={handleCopyLink}
                      type="submit"
                      size="sm"
                      className="px-3"
                    >
                      <span className="sr-only">Copy</span>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          </div>
        </div>
      </div>
    </>
  );
}
