
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import type { Translations } from "@/lib/i18n";

export type FormData = z.infer<ReturnType<typeof getFormSchema>>;

interface NatalChartFormProps {
  onSubmit: (data: FormData) => void;
  disabled: boolean;
  translations: Translations;
  setLang: (lang: 'pt' | 'en' | 'es' | 'it' | 'fr') => void;
}

const getFormSchema = (t: Translations['form']) => z.object({
  name: z.string().optional(),
  birthDate: z.string().min(1, t.invalidDate),
  birthTime: z.string({ required_error: t.timeRequired }).min(1, t.timeRequired),
  lang: z.enum(['pt', 'en', 'es', 'it', 'fr']),
});


export function NatalChartForm({ onSubmit, disabled, translations, setLang }: NatalChartFormProps) {
  
  const t = translations.form;
  const formSchema = getFormSchema(t);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      birthDate: "1995-06-15",
      birthTime: "14:30",
      lang: "pt",
    },
  });

  return (
     <div className="max-w-md mx-auto bg-slate-900/50 p-8 rounded-3xl border border-slate-800 backdrop-blur-sm shadow-2xl">
        <h3 className="text-xl font-semibold mb-6 text-center text-white">{t.title}</h3>
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
              <FormMessage>{form.formState.errors.birthDate?.message}</FormMessage>
              
              <FormField
                control={form.control}
                name="lang"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase text-slate-500 font-bold ml-1">Idioma do Guia</FormLabel>
                    <Select onValueChange={(value: 'pt' | 'en' | 'es' | 'it' | 'fr') => {
                      field.onChange(value);
                      setLang(value);
                    }} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-purple-500 outline-none transition-all">
                          <SelectValue placeholder="Selecione o idioma" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-slate-900 text-white border-slate-700">
                        <SelectItem value="pt">Português 🇧🇷</SelectItem>
                        <SelectItem value="en">English 🇺🇸</SelectItem>
                        <SelectItem value="es">Español 🇪🇸</SelectItem>
                        <SelectItem value="it">Italiano 🇮🇹</SelectItem>
                        <SelectItem value="fr">Français 🇫🇷</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <Button type="submit" disabled={disabled} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center">
              {disabled ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.generatingButton}
                </>
              ) : (
                t.submitButton
              )}
            </Button>
          </form>
        </Form>
    </div>
  );
}
