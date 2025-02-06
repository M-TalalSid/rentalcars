import Image from "next/image";

export function HeroSection() {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-20 p-16">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 p-6">
        <div className="mb-20">
          <h2 className="mb-4 text-3xl font-bold text-white">
            The Best Platform
            <br />
            for Car Rental
          </h2>
          <p className="text-blue-50">
            Ease Of Doing A Car Rental Safely And
            <br />
            Reliably. Of Course At A Low Price.
          </p>
          <button className="mt-4" type="button">
            Rental Car
          </button>
        </div>
        <Image
          src="/car-1.png"
          alt="White sports car"
          width={900}
          height={640}
          className="absolute bottom-0 right-20"
        />
      </div>
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 p-12">
        <div className="mb-20">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Easy Way To Rent A
            <br />
            Car At A Low Price
          </h2>
          <p className="text-blue-50">
            Providing Cheap Car Rental Services
            <br />
            And Safe And Comfortable Facilities.
          </p>
          <button className="mt-4" type="button">
            Rental Car
          </button>
        </div>
        <Image
          src="/image-8.png"
          alt="Grey sports car"
          width={560}
          height={540}
          className="absolute bottom-0 right-20"
        />
      </div>
    </div>
  )
}

export default HeroSection

