"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ZODIAC_SIGNS } from "@/lib/constants";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

const formSchema = z.object({
  name: z.string().optional(),
  birthDate: z.string({ required_error: "Birth date is required." }),
  birthTime: z.string({ required_error: "Birth time is required." }),
  birthLocation: z.string().min(2, "Birth location is required."),
  sunSign: z.enum(ZODIAC_SIGNS, { required_error: "Sun sign is required." }),
  moonSign: z.enum(ZODIAC_SIGNS, { required_error: "Moon sign is required." }),
  risingSign: z.enum(ZODIAC_SIGNS, { required_error: "Rising sign is required." }),
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
      birthLocation: "",
      name: "",
    },
  });

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Enter Your Birth Details</CardTitle>
        <CardDescription>Provide your information to generate your natal chart.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => field.onChange(date?.toISOString().split("T")[0])}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time of Birth</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="birthLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place of Birth</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., New York, USA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(['sunSign', 'moonSign', 'risingSign'] as const).map((sign) => (
                <FormField
                  key={sign}
                  control={form.control}
                  name={sign}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{sign.replace('Sign', ' Sign')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={`Select ${sign.replace('Sign', '')}`} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ZODIAC_SIGNS.map((zodiacSign) => (
                            <SelectItem key={zodiacSign} value={zodiacSign}>
                              {zodiacSign}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={disabled} className="w-full text-lg py-6">
              {disabled ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Natal Chart"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
