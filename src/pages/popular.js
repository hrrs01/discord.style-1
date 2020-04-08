import { attributes } from '~/content/popular.md'
import TemplateCard from '~/components/TemplateCard'

const { heading, leading } = attributes

const Home = () => {
  return (
    <>
      <div className="bg-discord-0 py-8 sm:py-10 md:py-12">
        <div className="container">
          <div className="row">
            <div className="col md:w-2/3 lg:w-1/2 text-white">
              <h1 className="text-4xl font-bold mb-4 leading-tight">
                {heading}
              </h1>
              <p className="text-discord-600 font-medium text-lg lg:w-5/6">
                {leading}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8 sm:py-10 md:py-12">
        <div className="container">
          <div className="row -mb-8">
            <TemplateCard
              title="Lorem ipsum"
              name="Tom Cook"
              profilePicture="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              username="@tomcook"
              description="Lorem ipsum dolor sit amet"
              tags={['gaming', 'community']}
              downloads={123}
              likes={47}
            />
            <TemplateCard
              title="Lorem ipsum"
              name="Tom Cook"
              profilePicture="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              username="@tomcook"
              description="Lorem ipsum dolor sit amet"
              tags={['gaming', 'community']}
              downloads={123}
              likes={47}
            />
            <TemplateCard
              title="Lorem ipsum"
              name="Tom Cook"
              profilePicture="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              username="@tomcook"
              description="Lorem ipsum dolor sit amet"
              tags={['gaming', 'community']}
              downloads={123}
              likes={47}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
