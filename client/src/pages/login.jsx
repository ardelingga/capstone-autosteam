import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../services/api-services";
import Swal from 'sweetalert2';
import LocalStorageService from '../services/local-storage-service';
import { setCookie } from '../services/cookie-services';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const initLoginPage = () => {
    if (LocalStorageService.getItem('user_profile')) {
      navigate('/home');
    }
  }


  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const reqLogin = await apiService.post("/auth/signin", {
        email: values.email,
        password: values.password,
      });

      if (reqLogin.status === "success") {
        // Save user data to local storage
        LocalStorageService.setItem('user_profile', reqLogin.data.user);

        // Set access token to cookie
        setCookie('access_token', reqLogin.data.access_token, 1);

        // Set access token to header
        apiService.setHeader('Authorization', `Bearer ${reqLogin.data.access_token}`);

        Swal.fire({
          icon: 'success',
          title: 'Login Berhasil',
          text: 'Selamat datang!',
        });
        navigate('/home');
      }else {
        Swal.fire({
          icon: 'error',
          title: 'Login Gagal',
          text: reqLogin.data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Gagal',
        text: error.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.',
      });
    } finally {
      setIsLoading(false); // Selesai loading
    }
  }

  useEffect(() => {
    initLoginPage();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="pt-6">
        <div className="flex justify-center">
          <div className="flex items-center justify-between space-x-3">
            <img
              src="/logo.png"
              alt=""
              className="w-[75px] h-[75px] rounded-[30px]"
            />
            <div className="flex flex-col ">
              <h1 className="uppercase font-bold text-base">
                auto steam cashier
              </h1>
              <p>Car and Motorbike</p>
            </div>
          </div>
        </div>

        <h2 className="font-bold mt-[58px]">Sign in to your account</h2>

        {/* form */}
        <div className="mt-[39px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        {...form.register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email address",
                          },
                        })}
                      />
                    </FormControl>

                    <FormMessage>
                      {form.formState.errors.email && (
                        <span>{form.formState.errors.email.message}</span>
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FormLabel className="text-muted">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                        {...form.register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                      />
                    </FormControl>

                    <FormMessage>
                      {form.formState.errors.password && (
                        <span>{form.formState.errors.password.message}</span>
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <div className="text-right mt-3">
                <a href="#" className="text-primary text-sm font-semibold">
                  Forgot Password
                </a>
              </div>
              <Button
                  type="submit"
                  className="w-full mt-9"
                  disabled={isLoading} // Disable button saat loading
              >
                {isLoading ? "Logging In..." : "Log In"}
              </Button>
              <Button type="submit" variant="outline" className="w-full mt-5">
                <img
                  src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                  alt=""
                  className="w-8 h-8"
                />
                Log In with google
              </Button>
            </form>
          </Form>
        </div>
        <div className="text-center mt-6">
          <p>Belum memiliki akun kasir ?</p>
          <Link to="/register" className="text-blue-500 no-underline">
            Daftarkan akun
          </Link>
        </div>
      </div>
    </div>
  );
}
