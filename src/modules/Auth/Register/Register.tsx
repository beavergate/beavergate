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
import { FcGoogle } from "react-icons/fc";
import SeperatorWithName from "@/components/SeperatorWithName";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRegister } from "@/hooks/auth";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
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
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-sm">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 bg-white dark:bg-gray-800 p-6 rounded shadow-md"
            >
              <h1 className="text-xl font-semibold text-center mb-4">
                Register
              </h1>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Your name" {...field} />
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
                        placeholder="you@example.com"
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
                      <Input
                        type="password"
                        placeholder="Your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </Button>

              {error && (
                <p className="text-red-500 text-center mt-4">{error}</p>
              )}

              <SeperatorWithName text="OR" />

              <Button
                type="button"
                className="w-full flex items-center justify-center bg-white text-black p-2 rounded mt-4"
                onClick={() => signIn("google")}
              >
                <FcGoogle className="mr-2" /> Sign up with Google
              </Button>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                Already have an account? <Link href="/login">Login</Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <h1 className="text-2xl font-semibold">
          Welcome, {session.user?.name}
        </h1>
        <Button onClick={() => signOut()} className="mt-4">
          Sign out
        </Button>
      </div>
    );
  }
};

export default Register;
