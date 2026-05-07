"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    if (isActive) {
    }
  }, [isActive]);
}
