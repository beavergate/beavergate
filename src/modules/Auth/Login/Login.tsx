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
import registerCoverImage from "assets/container.png";
import logo from "assets/logo.png";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import SeperatorWithName from "@/components/SeperatorWithName";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PasswordInput from "@/components/PasswordInput";
import { Checkbox } from "@/ui/checkbox";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        // Handle error (e.g., display a message to the user)
        console.error(result.error);
      } else if (result?.ok) {
        router.push("/");
        // Successful login, you can redirect the user or show a success message
        console.log("Login successful");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  if (!session) {
    return (
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="px-6 py-12 lg:px-8 xl:px-12">
          <div className="flex items-center">
            <Image src={logo} alt="BeaverGate Logo" />
          </div>
          <div className="mx-auto mt-[120px] max-w-md">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
              <p className="text-sm text-muted-foreground">
                Please login to continue to your account.
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-8 space-y-4"
              >
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
                <div className="flex items-center space-x-2">
                  <Checkbox id="keep-logged-in" />
                  <label
                    htmlFor="keep-logged-in"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Keep me logged in
                  </label>
                </div>
                <Button type="submit" className="w-full bg-[#367AFF]">
                  Sign in
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
                Sign in with Google
              </Button>
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Need an account?{" "}
              <Link
                href="/register"
                className="font-medium text-[#367AFF] hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
        <div className="hidden lg:block m-2 ">
          <div className="relative h-full w-full">
            <Image
              src={registerCoverImage}
              alt="Login cover"
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

export default Login;
