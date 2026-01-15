
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import type { Translations } from "@/lib/i18n";


interface NatalChartFormProps {
  onSubmit: (data: FormData) => void;
  disabled: boolean;
  translations: Translations;
}

export function NatalChartForm({ onSubmit, disabled, translations }: NatalChartFormProps) {
  
  const t = translations.form;

  const formSchema = z.object({
    name: z.string().optional(),
    birthDay: z.string().min(1, t.dayRequired).max(2),
    birthMonth: z.string().min(1, t.monthRequired).max(2),
    birthYear: z.string().min(4, t.yearRequired).max(4),
    birthTime: z.string({ required_error: t.timeRequired }).min(1, t.timeRequired),
  }).refine(data => {
      const day = parseInt(data.birthDay, 10);
      const month = parseInt(data.birthMonth, 10);
      const year = parseInt(data.birthYear, 10);
      if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
      
      if (year < 1900 || year > new Date().getUTCFullYear()) return false;
      if (month < 1 || month > 12) return false;
      if (day < 1 || day > 31) return false;

      const date = new Date(Date.UTC(year, month - 1, day));
      return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
  }, {
      message: t.invalidDate,
      path: ["birthDay"], 
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      birthDay: "15",
      birthMonth: "06",
      birthYear: "1995",
      birthTime: "14:30",
    },
  });

  return (
     <div className="max-w-md mx-auto bg-slate-900/50 p-8 rounded-3xl border border-slate-800 backdrop-blur-sm shadow-2xl">
        <h3 className="text-xl font-semibold mb-6 text-center text-white">Comece sua jornada grátis</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-left">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase text-slate-500 font-bold ml-1">{t.nameLabel}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t.namePlaceholder} 
                        {...field} 
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-purple-500 outline-none transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem>
                         <FormLabel className="text-xs uppercase text-slate-500 font-bold ml-1">{t.dateLabel}</FormLabel>
                         <FormControl>
                            <Input 
                              type="date"
                              {...field}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-purple-500 outline-none transition-all"
                             />
                         </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="birthTime"
                    render={({ field }) => (
                       <FormItem>
                         <FormLabel className="text-xs uppercase text-slate-500 font-bold ml-1">{t.timeLabel}</FormLabel>
                         <FormControl>
                            <Input 
                              type="time"
                              {...field}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-purple-500 outline-none transition-all"
                             />
                         </FormControl>
                       </FormItem>
                    )}
                  />
              </div>
              <FormMessage>{form.formState.errors.birthDay?.message}</FormMessage>

            <button type="submit" disabled={disabled} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/20 transition-all transform hover:scale-[1.02]">
              {disabled ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.generatingButton}
                </>
              ) : (
                "Gerar Meu Guia Agora"
              )}
            </button>
          </form>
        </Form>
    </div>
  );
}

export type { FormData } from './natal-chart-form';
