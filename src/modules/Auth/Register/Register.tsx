"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useState } from "react";
import registerCoverImage from "assets/container.png";
import logo from "assets/logo.png";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import SeperatorWithName from "@/components/SeperatorWithName";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRegister } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import PasswordInput from "@/components/PasswordInput";

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type RegisterSchema = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [register, { loading, error }] = useRegister();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      dateOfBirth: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const user = await register(data);
      if (user) {
        const result = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });
        if (result?.ok) {
          router.push("/");
          // Successful login, you can redirect the user or show a success message
          console.log("Login successful");
        }
      }
      // Handle successful registration (e.g., redirect, show success message)
    } catch (err) {
      // Handle registration error (e.g., show error message)
    }
  };

  if (!session) {
    return (
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="px-6 py-12 lg:px-8 xl:px-12">
          <div className="flex items-center">
            <Image src={logo} alt="Logo" />
          </div>
          <div className="mx-auto mt-12 max-w-md">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">Sign up</h1>
              <p className="text-sm text-muted-foreground">
                Sign up to enjoy the features of Revolutie
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-8 space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jonas Khanwald" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="jonas_khanwald@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-[#367AFF]"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      {/* <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> */}
                      Please wait
                    </>
                  ) : (
                    "Sign up"
                  )}
                </Button>
              </form>
            </Form>
            <div className="mt-6">
              <SeperatorWithName text="OR" />
              <Button
                variant="outline"
                className="mt-6 w-full"
                onClick={() => signIn("google")}
              >
                <FcGoogle className="mr-2" />
                Continue with Google
              </Button>
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
        <div className="hidden lg:block m-2 ">
          <div className="relative h-full w-full">
            <Image
              src={registerCoverImage}
              alt="Register cover"
              layout="fill"
              objectFit="cover"
              className="rounded-[10px]"
            />
          </div>
        </div>
      </div>
    );
  }
};

export default Register;
