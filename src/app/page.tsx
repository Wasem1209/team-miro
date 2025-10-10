'use client'
import HeroSection from "./Components/HeroSection";
import FeaturedVehicle from "./Components/FeaturedVehicle";
import WhyChooseUs from "./Components/WhyChooseUs";



export default function Home() {
    return (
        <main>
          
            <section className="mt-20 text-center px-4 bg-[#F0F0F0]">
              <HeroSection />
          <FeaturedVehicle />
          <WhyChooseUs />
            </section>
           
        </main>
    )
}