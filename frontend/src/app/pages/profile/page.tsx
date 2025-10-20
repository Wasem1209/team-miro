"use client"
import { useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function ProfileIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/profile/personal-information');
  }, [router]);

  return null;
}
