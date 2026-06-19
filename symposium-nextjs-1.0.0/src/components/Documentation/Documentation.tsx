import { Introduction } from "./Introduction"
import { PackageStructure } from "./PackageStructure"

export const Documentation = () => {
  return (
    <div className="dark:bg-darkmode min-h-screen">
      
      {/* OUTER WRAPPER */}
      <div className="flex justify-center w-full mt-16 pt-10">
        
        {/* CENTERED CONTENT */}
        <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* <Introduction /> */}
          <PackageStructure />
        </div>

      </div>
    </div>
  )
}
