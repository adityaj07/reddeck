"use client";

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
import { useAuthActions } from "@convex-dev/auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AuthFormValues, signinSchema } from "@/schemas/auth";
import { PasswordInput } from "./password-input";

export function SigninForm() {
  const [step, setStep] = useState<"signIn" | "signUp">("signIn");
  // step state to diff between signin and signup as only a single utility is provided by convex for both
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { signIn } = useAuthActions();
  const router = useRouter();

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: AuthFormValues) {
    setIsLoading(true);
    try {
      await signIn("password", {
        ...values,
        flow: step,
      });
      toast.success(
        step === "signIn"
          ? "Signed In successfully"
          : "Account created successfully"
      );
      router.push("/");
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        if (error.message.includes("InvalidSecret")) {
          // Wrong password
          form.setError("root", {
            type: "manual",
            message: "Invalid credentials.",
          });
        } else if (error.message.includes("InvalidAccountId")) {
          if (step === "signIn") {
            // User tried to log in but account doesn't exist
            form.setError("root", {
              type: "manual",
              message: "User doesn't exist. Please create a new account.",
            });
          } else {
            // User tried to sign up but Convex still complained (edge case)
            form.setError("root", {
              type: "manual",
              message: "Unable to create account. Please try again.",
            });
          }
        } else {
          toast.error("Something went wrong. Please try again. 123");
        }
      } else {
        toast.error("Something went wrong. Please try again. 456");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-muted/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-2"
          >
            <h1 className="text-3xl font-bold text-card-foreground">
              {step === "signIn" ? "Login" : "Create Account"}
            </h1>
            <p className="text-muted-foreground">
              {step === "signIn"
                ? "Enter your credentials to access your account."
                : "Enter your details to create a new account."}
            </p>
          </motion.div>
        </AnimatePresence>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      {...field}
                      type="email"
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
            {form.formState.errors.root && (
              <div className="text-sm text-destructive">
                {form.formState.errors.root.message}
              </div>
            )}
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {step === "signIn" ? "Sign In" : "Sign Up"}
              </Button>
            </motion.div>
          </form>
        </Form>

        <motion.div whileHover={{ scale: 1.02 }}>
          <Button
            variant="link"
            type="button"
            className="w-full text-sm text-muted-foreground cursor-pointer"
            onClick={() => {
              setStep(step === "signIn" ? "signUp" : "signIn");
              setIsLoading(false);
              form.reset();
            }}
          >
            {step === "signIn"
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
