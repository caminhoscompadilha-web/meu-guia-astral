
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

const formSchema = z.object({
  name: z.string().optional(),
  birthDay: z.string().min(1, 'Dia é obrigatório').max(2),
  birthMonth: z.string().min(1, 'Mês é obrigatório').max(2),
  birthYear: z.string().min(4, 'Ano é obrigatório').max(4),
  birthTime: z.string({ required_error: "Hora de nascimento é obrigatória." }),
  birthCity: z.string().min(2, "Cidade é obrigatória."),
  birthState: z.string().min(2, "Estado é obrigatório."),
  birthCountry: z.string().min(2, "País é obrigatório."),
}).refine(data => {
    const day = parseInt(data.birthDay, 10);
    const month = parseInt(data.birthMonth, 10);
    const year = parseInt(data.birthYear, 10);
    if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
    
    // Validação básica de intervalo
    if (year < 1900 || year > new Date().getUTCFullYear()) return false;
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;

    // Checagem de data válida usando UTC para evitar problemas de fuso horário
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}, {
    message: "Data de nascimento inválida.",
    path: ["birthDay"], 
});


export type FormData = z.infer<typeof formSchema>;

interface NatalChartFormProps {
  onSubmit: (data: FormData) => void;
  disabled: boolean;
}

export function NatalChartForm({ onSubmit, disabled }: NatalChartFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      birthDay: "",
      birthMonth: "",
      birthYear: "",
      birthCity: "",
      birthState: "",
      birthCountry: "",
    },
  });

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Insira Seus Dados de Nascimento</CardTitle>
        <CardDescription>Forneça suas informações para gerar seu mapa natal.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: Maria Silva" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Data de Nascimento</FormLabel>
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="birthDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Dia" {...field} />
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
                        <Input placeholder="Mês" {...field} />
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
                        <Input placeholder="Ano" {...field} />
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
                  <FormLabel>Hora de Nascimento</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <FormLabel>Local de Nascimento</FormLabel>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="birthCity"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-1">
                      <FormControl>
                        <Input placeholder="Cidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthState"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-1">
                      <FormControl>
                        <Input placeholder="Estado" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthCountry"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-1">
                      <FormControl>
                        <Input placeholder="País" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={disabled} className="w-full text-lg py-6">
              {disabled ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando...
                </>
              ) : (
                "Gerar Mapa Natal"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
