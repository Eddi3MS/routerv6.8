import { fetchData } from '../helpers'
import { Outlet, useLoaderData, LoaderFunction } from 'react-router-dom'
import wave from '../assets/wave.svg'
import { LoaderData } from '../types'
import { Nav } from '../components'

export const mainLoader = function () {
  const userName: string = fetchData('userName')

  return { userName }
} satisfies LoaderFunction

const Main = () => {
  const { userName } = useLoaderData() as LoaderData<typeof mainLoader>
  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  )
}

export default Main
