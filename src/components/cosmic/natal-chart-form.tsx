
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
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
    <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{t.title}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.nameLabel}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.namePlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>{t.dateLabel}</FormLabel>
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="birthDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder={t.dayPlaceholder} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder={t.monthPlaceholder} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder={t.yearPlaceholder} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormMessage>{form.formState.errors.birthDay?.message}</FormMessage>
            </div>
            
            <FormField
              control={form.control}
              name="birthTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.timeLabel}</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={disabled} className="w-full text-lg py-6">
              {disabled ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.generatingButton}
                </>
              ) : (
                t.submitButton
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

// Re-export FormData if it's used elsewhere
export type { FormData } from './natal-chart-form';
