import React from 'react'
import { Card } from 'flowbite-react'
import Skeleton , { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonLoad = ({ cnt }) => {
  return (
    Array(cnt).fill(0).map((_, i) => (
        // <SkeletonTheme baseColor="#000" highlightColor="#000">
        // <Skeleton count={3} />
      <Card key={i} className="mt-2 mb-2 ml-10 mr-10">
        <a href="#" target="_blank" rel="noopener noreferrer">
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            <Skeleton height={20} width={510} duration={1.5} color="black" />
          </h5>
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            <Skeleton height={20} duration={1.5} width={510} color="black" />
          </h5>
        </a>
        <div className="mb-5 mt-2.5 flex items-center">
          <span className="ml-3 mr-2 rounded px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
            <Skeleton width={70} height={15} duration={1.5} color="black" />
          </span>
          <span className="ml-3 mr-2 rounded px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
            <Skeleton width={70} height={15} duration={1.5} color="black" />
          </span>
        </div>
        <div className="flex items-middle">
          <a
            className="rounded-lg px-5 py-2.5 ml-3 mr-3 text-center text-sm font-smal text-white focus:outline-none focus:ring-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Skeleton width={100} height={30} duration={1.5} color="black" />
          </a>
          <a
           className="rounded-lg px-5 py-2.5 ml-3 mr-3 text-center text-sm font-smal text-white focus:outline-none focus:ring-4"
          >
            <Skeleton width={100} height={30} duration={1.5} color="black" />
          </a>
          <a
            className="rounded-lg px-5 py-2.5 ml-3 mr-3 text-center text-sm font-smal text-white focus:outline-none focus:ring-4"
          >
            <Skeleton width={100} height={30} duration={1.5} color="black" />
          </a>
        </div>
      </Card>
    //   </SkeletonTheme>
    ))
  )
}

export default SkeletonLoad
