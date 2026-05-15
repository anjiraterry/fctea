"use client";

import React from "react";
import BlogTable from "./blog/components/BlogTable";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { useResourceModal } from "@/lib/store/modal";

export default function Blog() {
  const openModal = useResourceModal(state => state.openModal);

	return (
		<div className="space-y-5">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">Blogs</h1>
				<Button
					className="flex items-center gap-2 "
					variant="outline"
          onClick={() => openModal("blog", "create")}
				>
					Create <PlusIcon />
				</Button>
			</div>

			<BlogTable />
		</div>
	);
}
