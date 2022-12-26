import  { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { title } from 'process'
import Banner from '../components/Banner'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Header from '../components/Header'
import LargeCard from '../components/LargeCard'
import MediumCard from '../components/MediumCard'
import { loca,cardData,discoverThings } from '../public/loca'

const Home = ({exploreData,houseDta,discover}) => {


  return (
    <div className="bg-[#1e1e38]">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Header></Header> */}
      <Banner></Banner>
      <main className='max-w-7xl mx-auto px-4 sm:px-16 bg-[#1e1e38]'>
        <section className='pt-6'>
          <h2 className='text-4xl pb-5 text-white font-semibold font-sans '>Explore nearby</h2>
          {/* Pull ddddatttttaa from server API ENDPOINT */}
          <div className='grid grid-cols-1 gap-6 m-5 overflow-scroll  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {exploreData?.map((location)=>(
          <Card
          key={location.id}
          name={location.location}
          img={location.img}
          avaible={location.avaible}
          distance={location.distance}
          ></Card>
          ))}

          </div>
        </section>
        <section>
          <h2 className='text-4xl font-semibold py-8 text-white font-sans mt-4'>Live Anywhere</h2>
          <div className='flex space-x-3 overflow-scroll 
          scrollbar-hide p-3 -ml-3'>

          {houseDta?.map((item,index)=>(
           <MediumCard key={index} title={item.title} img={item.img} >

           </MediumCard>
          ))}
          </div>
          <h2 className='text-4xl font-semibold py-8 text-white font-sans mt-6'>Discover things to do</h2>

          <div className='flex space-x-3 overflow-scroll 
          scrollbar-hide mt-10 p-3 -ml-3'>

          {discover?.map((item,index)=>(
           <MediumCard key={index} title={item.title} img={item.img}>

           </MediumCard>
          ))}
          </div>
        </section>
        <LargeCard></LargeCard>
      </main>
        <Footer></Footer>

     
    </div>
  )
}
export async function getStaticProps(){
  const exploreData=loca
  const houseDta=cardData
  const discover=discoverThings
  
  return {
    props: {
      exploreData,
      houseDta,
      discover
    }
  }

}

// https://jsonkeeper.com/b/4G1G
// https://a0.muscache.com/pictures/79156c77-8352-48f7-9967-78967c73a38d.jpg
// https://a0.muscache.com/pictures/pro_photo_tool/Hosting-23210127-unapproved/original/aeefe715-39f4-4dbc-aafb-7b08dbc60bd4.JPEG
// https://a0.muscache.com/pictures/e1d0bcfd-05b6-4af1-a799-82dc15dd8439.jpg
// https://a0.muscache.com/pictures/4b23b420-48b9-48c6-b09a-4d7e31599f6c.jpg
export default Home
