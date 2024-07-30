import Carousel from "@/src/components/ui/carrousel";
import Navbar from "@/src/components/ui/navbar";
import Image from "next/image";

const images = [
   { src: "/joker.png", name: "Joker" },
   { src: "/joker.png", name: "Joker" },
   { src: "/joker.png", name: "Joker" },
   { src: "/joker.png", name: "Joker" },
   { src: "/joker.png", name: "Joker" },
   { src: "/joker.png", name: "Joker" },
   { src: "/joker.png", name: "Joker" },
   { src: "/joker.png", name: "Joker" },
   { src: "/joker.png", name: "Joker" },
];

export default function Home() {
   return (
      <main className="min-h-screen">
         <Navbar />
         <header className="relative w-full h-[90vh]">
            <Image
               src="/joker.png"
               alt="Affiche"
               layout="fill"
               objectFit="cover"
               quality={100}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black to-[rgba(0,0,0,0.2)]"></div>

            <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
               <div className="w-1/2 h-full flex flex-col justify-center items-center text-center">
                  <h1 className="text-4xl font-bold mb-4">Joker</h1>

                  <p className="text-lg max-w-md font-extralight">Thriller - Films - 2019 - 2 h 20 min</p>

                  <p className="text-xl max-w-md">
                     Dans les années 1980, à Gotham City, Arthur Fleck, un humoriste de stand-up raté, bascule dans la
                     folie et devient le Joker.
                  </p>
               </div>
            </div>
         </header>

         <section className="p-8">
            <p className="text-white text-xl inline-block border-b-2 border-white pb-2 mb-3">Mes recommandations</p>

            <Carousel images={images} />
         </section>

         <section className="p-8">
            <p className="text-white text-xl inline-block border-b-2 border-white pb-2 mb-3">Les tops du moment </p>

            <Carousel images={images} />
         </section>

         <section className="p-8">
            <p className="text-white text-xl inline-block border-b-2 border-white pb-2 mb-3">Nouveautés</p>

            <Carousel images={images} />
         </section>
      </main>
   );
}
