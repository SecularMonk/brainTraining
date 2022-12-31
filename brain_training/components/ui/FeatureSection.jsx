import { BeakerIcon, AcademicCapIcon, ArrowTrendingUpIcon, BanknotesIcon } from "@heroicons/react/24/outline";

const features = [
   {
      name: "Boost your IQ",
      description:
         "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
      icon: AcademicCapIcon,
   },
   {
      name: "Scientifically proven",
      description: "Proven through randomised control trials to reliably improve measures of IQ. See our about section for more info.",
      icon: BeakerIcon,
   },
   {
      name: "Track your progress",
      description:
         "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
      icon: ArrowTrendingUpIcon,
   },
   {
      name: "Always free. Forever.",
      description: "We believe in free and open access to training for everyone. We are supported by ads. No cost to you, ever.",
      icon: BanknotesIcon,
   },
];

export default function FeatureSection() {
   return (
      <div className="bg-gray-200 py-24 sm:py-32 lg:py-40">
         <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="sm:text-center">
               <h2 className="text-lg font-semibold leading-8 text-indigo-600">Brain power</h2>
               <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A better way to boost your brain power.</p>
               <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                  Not all brain training is created equal. Finally, there is a freely available way to boost your IQ that's supported by science.
               </p>
            </div>

            <div className="mt-20 max-w-lg sm:mx-auto md:max-w-none">
               <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
                  {features.map((feature) => (
                     <div key={feature.name} className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white sm:shrink-0">
                           <feature.icon className="h-8 w-8" aria-hidden="true" />
                        </div>
                        <div className="sm:min-w-0 sm:flex-1">
                           <p className="text-lg font-semibold leading-8 text-gray-900">{feature.name}</p>
                           <p className="mt-2 text-base leading-7 text-gray-600">{feature.description}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}
