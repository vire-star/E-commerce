import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUpdateMutation } from "@/hooks/User/user.hook";
import { useUserStore } from '@/Store/Store';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Camera, User, Mail } from "lucide-react";

const Profile = () => {
  const { user } = useUserStore();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: user?.name || ""
    }
  });

  const { mutate, isPending } = useUpdateMutation();

  const updateFormHandler = (data) => {
    const formData = new FormData();

    if (data.name && data.name !== user?.name) {
      formData.append('name', data.name);
    }

    if (data.profilePhoto && data.profilePhoto[0]) {
      formData.append('profilePhoto', data.profilePhoto[0]);
    }

    mutate(formData, {
      onSuccess: () => {
        setOpen(false);
        reset();
      }
    });
  };

  // Get user initials for avatar fallback
  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Profile Header Card */}
        <Card className='mb-6'>
          <CardHeader className='text-center pb-2'>
            <div className='flex justify-center mb-4'>
              <div className='relative'>
                <Avatar className='h-32 w-32 border-4 border-white shadow-xl'>
                  <AvatarImage 
                    src={user?.profilePhoto} 
                    alt={user?.name}
                    className='object-cover'
                  />
                  <AvatarFallback className='text-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white'>
                    {getInitials(user?.name)}
                  </AvatarFallback>
                </Avatar>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="icon" 
                      className='absolute bottom-0 right-0 rounded-full h-10 w-10 shadow-lg'
                    >
                      <Camera className='h-4 w-4' />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                      <DialogDescription>
                        Update your profile information and photo here.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={handleSubmit(updateFormHandler)} className='space-y-4 mt-4'>
                      <div className='space-y-2'>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter your name"
                          {...register("name")}
                          className='w-full'
                        />
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor="profilePhoto">Profile Photo</Label>
                        <Input
                          id="profilePhoto"
                          type="file"
                          accept="image/*"
                          {...register("profilePhoto")}
                          className='w-full cursor-pointer'
                        />
                        <p className='text-xs text-muted-foreground'>
                          Recommended: Square image, max 5MB
                        </p>
                      </div>

                      <div className='flex justify-end gap-3 pt-4'>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setOpen(false)}
                          disabled={isPending}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                          {isPending ? "Updating..." : "Save Changes"}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <CardTitle className='text-3xl font-bold'>{user?.name}</CardTitle>
            <CardDescription className='flex items-center justify-center gap-2 text-base mt-2'>
              <Mail className='h-4 w-4' />
              {user?.email}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Additional Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Manage your account details</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between py-3 border-b'>
              <div className='flex items-center gap-3'>
                <User className='h-5 w-5 text-muted-foreground' />
                <div>
                  <p className='text-sm font-medium'>Display Name</p>
                  <p className='text-sm text-muted-foreground'>{user?.name}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
                Edit
              </Button>
            </div>

            <div className='flex items-center justify-between py-3 border-b'>
              <div className='flex items-center gap-3'>
                <Mail className='h-5 w-5 text-muted-foreground' />
                <div>
                  <p className='text-sm font-medium'>Email Address</p>
                  <p className='text-sm text-muted-foreground'>{user?.email}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
