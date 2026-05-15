"use client";

import React from "react";
import { EyeOpenIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteAlert from "./DeleteAlert";
import { useResourceModal } from "@/lib/store/modal";

export default function BlogActions({ blog }: { blog: any }) {
  const openModal = useResourceModal(state => state.openModal);

  return (
    <div className="flex items-center gap-2 md:flex-wrap">
      <Link href={`/blog/${blog.slug || blog.id}`}>
        <Button className="flex gap-2 items-center" variant="outline">
          <EyeOpenIcon />
          View
        </Button>
      </Link>
      <DeleteAlert id={blog.id} />

      <Button 
        onClick={() => openModal("blog", "edit", blog)}
        className="flex gap-2 items-center" 
        variant="outline"
      >
        <Pencil1Icon />
        Edit
      </Button>
    </div>
  );
}
