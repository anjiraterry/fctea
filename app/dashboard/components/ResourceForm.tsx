"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState, useTransition } from "react";
import { Loader2, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import ImageUpload from "./ImageUpload";

interface ResourceFormProps {
  schema: z.ZodObject<any>;
  defaultValues: any;
  onSubmit: (data: any) => Promise<void>;
  title: string;
  fields: {
    name: string;
    label: string;
    type: "text" | "textarea" | "number" | "switch" | "date" | "url" | "image" | "email" | "multi-image";
    placeholder?: string;
  }[];
}

export default function ResourceForm({ schema, defaultValues, onSubmit, title, fields }: ResourceFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = (data: any) => {
    startTransition(async () => {
      await onSubmit(data);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-[2.5rem] border border-[#C06350]/10 shadow-sm mt-10">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#2D241E] tracking-tight">{title}</h1>
        <p className="text-[#2D241E]/40 text-sm mt-1 font-medium">Fill in the details below to update the city database.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Handle multi-image separately to put it at the top */}
          {fields.filter(f => f.type === "multi-image").map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: fieldProps }) => (
                <FormItem className="col-span-full">
                  <FormLabel className="text-[#2D241E] font-bold text-xs uppercase tracking-widest">{field.label}</FormLabel>
                  <FormControl>
                    <ImageUpload 
                      value={fieldProps.value || []} 
                      onChange={fieldProps.onChange} 
                      maxFiles={5}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 font-medium" />
                </FormItem>
              )}
            />
          ))}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.filter(f => f.type !== "multi-image").map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: fieldProps }) => (
                  <FormItem className={cn(field.type === "textarea" ? "md:col-span-2" : "")}>
                    <FormLabel className="text-[#2D241E] font-bold text-xs uppercase tracking-widest">{field.label}</FormLabel>
                    <FormControl>
                      {field.type === "textarea" ? (
                        <Textarea 
                          {...fieldProps} 
                          placeholder={field.placeholder} 
                          className="rounded-2xl border-[#F2EAE5] focus:ring-[#C06350] focus:border-[#C06350] min-h-[120px]"
                        />
                      ) : field.type === "switch" ? (
                        <div className="flex items-center gap-3 py-2">
                          <Switch
                            checked={fieldProps.value}
                            onCheckedChange={fieldProps.onChange}
                          />
                          <span className="text-sm text-[#2D241E]/60">Enable this option</span>
                        </div>
                      ) : (
                        <Input 
                          type={field.type === "date" ? "datetime-local" : field.type === "number" ? "number" : "text"}
                          {...fieldProps} 
                          placeholder={field.placeholder}
                          className="rounded-xl border-[#F2EAE5] focus:ring-[#C06350] focus:border-[#C06350]"
                          onChange={(e) => {
                            const val = field.type === "number" ? parseFloat(e.target.value) : e.target.value;
                            fieldProps.onChange(val);
                          }}
                        />
                      )}
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 font-medium" />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <div className="pt-6 border-t border-[#F2EAE5] flex justify-end">
            <Button 
              type="submit" 
              disabled={isPending}
              className="bg-[#2D241E] hover:bg-black text-white px-8 py-6 rounded-2xl font-bold flex items-center gap-2 transition-all active:scale-95"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Save Resource</>}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
