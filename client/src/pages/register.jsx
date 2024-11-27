import React from "react";
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
import apiService from "../services/api-services";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import LocalStorageService from "../services/local-storage-service";
import { setCookie } from '../services/cookie-services';

export default function Register() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      name_business: "",
      email: "",
      phone_number: "",
      address: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      const reqRegister = await apiService.post("/auth/signup", {
        name_business: values.name_business,
        email: values.email,
        phone_number: values.phone_number,
        address: values.address,
        password: values.password,
      });

      if (reqRegister.status === "success") {
        // Save user data to local storage
        LocalStorageService.setItem("user_profile", reqRegister.data.user);

        // Set access token to cookie
        setCookie("access_token", reqRegister.data.access_token, 1);

        // Set access token to header
        apiService.setHeader(
          "Authorization",
          `Bearer ${reqRegister.data.access_token}`
        );
        Swal.fire({
          icon: "success",
          title: "Registrasi Berhasil",
          text: "Akun Anda telah berhasil dibuat!",
        });
        navigate("/home");
      } else {
        Swal.fire({
          icon: "error",
          title: "Registrasi Gagal",
          text: reqRegister.data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registrasi Gagal",
        text:
          error.response?.data?.message ||
          "Terjadi kesalahan, silakan coba lagi.",
      });
    }
  }

  return (
    <div className="container mx-auto px-4">
      <div className="pt-6">
        <div className="flex justify-center">
          <div className="flex items-center justify-between space-x-3">
            <img
              src="../../public/logo.png"
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

        <h2 className="font-bold mt-[58px]">Create your account</h2>

        {/* form */}
        <div className="mt-[39px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name_business"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted">Nama Toko</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nama Toko"
                        {...field}
                        {...form.register("name_business", {
                          required: "Nama Toko is required",
                        })}
                      />
                    </FormControl>

                    <FormMessage>
                      {form.formState.errors.name_business && (
                        <span>
                          {form.formState.errors.name_business.message}
                        </span>
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FormLabel className="text-muted">Email Toko</FormLabel>
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
                name="phone_number"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FormLabel className="text-muted">Nomor Telepon</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Nomor Telepon"
                        {...field}
                        {...form.register("phone_number", {
                          required: "Nomor Telepon is required",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Nomor Telepon harus berupa angka",
                          },
                        })}
                      />
                    </FormControl>

                    <FormMessage>
                      {form.formState.errors.phone_number && (
                        <span>
                          {form.formState.errors.phone_number.message}
                        </span>
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FormLabel className="text-muted">Alamat</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Alamat"
                        {...field}
                        {...form.register("address", {
                          required: "Alamat is required",
                        })}
                      />
                    </FormControl>

                    <FormMessage>
                      {form.formState.errors.address && (
                        <span>{form.formState.errors.address.message}</span>
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
              <Button type="submit" className="w-full mt-9">
                Daftar Akun
              </Button>
              <Button type="submit" variant="outline" className="w-full mt-5">
                <img
                  src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                  alt=""
                  className="w-8 h-8"
                />
                Daftar Akun dengan Google
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
