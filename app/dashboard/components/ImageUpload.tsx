"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { useToast } from "@/components/ui/use-toast";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  maxFiles?: number;
}

export default function ImageUpload({ value = [], onChange, maxFiles = 5 }: ImageUploadProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (value.length + files.length > maxFiles) {
      toast({
        title: "Upload Limit",
        description: `You can only upload up to ${maxFiles} images.`,
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload / Convert to Base64 for now
    const newImages = await Promise.all(
      files.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      })
    );

    onChange([...value, ...newImages]);
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    onChange(newValue);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <AnimatePresence mode="popLayout">
          {value.map((url, index) => (
            <motion.div
              key={url + index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              layout
              className="relative aspect-square rounded-2xl overflow-hidden border border-[#C06350]/10 bg-[#F9F1ED] group"
            >
              <Image src={url} alt="Upload" fill className="object-cover" />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500"
              >
                <X className="w-3 h-3" />
              </button>
              {index === 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-[#C06350] text-white text-[8px] font-black uppercase tracking-widest py-1 text-center">
                  Cover
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {value.length < maxFiles && (
          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "relative aspect-square rounded-2xl border-2 border-dashed border-[#C06350]/20 bg-[#F9F1ED]/30 flex flex-col items-center justify-center gap-2 hover:bg-[#F9F1ED] hover:border-[#C06350]/40 transition-all active:scale-95",
              isUploading && "opacity-50 cursor-not-allowed"
            )}
          >
            {isUploading ? (
              <Loader2 className="w-6 h-6 text-[#C06350] animate-spin" />
            ) : (
              <>
                <Upload className="w-6 h-6 text-[#C06350]" />
                <span className="text-[10px] font-bold text-[#C06350]/60 uppercase tracking-widest">
                  {value.length === 0 ? "Upload Images" : "Add More"}
                </span>
              </>
            )}
            <input
              type="file"
              multiple
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
            />
          </button>
        )}
      </div>
      <p className="text-[10px] text-[#2D241E]/30 font-medium">
        First image will be the cover. Max {maxFiles} images. High quality PNG/JPG preferred.
      </p>
    </div>
  );
}
