"use client"

import { redirect } from "next/navigation";
import { useEffect } from "react";

interface Params {
  id: string;
}

export default function ShortIdPage({ params }: { params: Params }) {
    const { id } = params;

    //make the redirection to the long url
    
    useEffect(() => {
      const url = sessionStorage.getItem(id)
      console.log("STORED ITEM:", url)
      console.log("ID:", id)

    if (url && isValidUrl(url)) {
      redirect(url);
    } else {
      redirect("/");
    }
  }, [id]);

  function isValidUrl(string: string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false
    }
  }

}
