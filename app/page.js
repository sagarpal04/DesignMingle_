import Image from "next/image";
import { App as Canvas } from "../comp/Canvas";
import { Overlay } from "@/comp/Overlay";
export default function Home() {
  return (
    <>
      <Canvas />
      <Overlay />
    </>
  );
}
