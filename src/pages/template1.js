import { attributes } from '~/content/template.md'
import TemplateCard from '~/components/TemplateCard'

const { heading, leading } = attributes

const Category = ({ title }) => {
  return (
    <div className="uppercase font-bold pt-2 pb-2 text-xs">
      <i className="fas fa-caret-down text-discord-400" aria-hidden={true} />
      {' ' + title}
    </div>
  )
}

const Channel = ({ title }) => {
  return (
    <div className="block pl-2 hover:bg-discord-700 hover:rounded-full align-middle lowercase">
      <span
        className="pr-2 text-2xl text-discord-500 align-middle"
        aria-hidden={true}
      >
        #
      </span>
      {' ' + title}
    </div>
  )
}

const Role = ({ color, title }) => {
  return (
    <div
      className="border-2 inline-flex p-4 items-center px-3 py-1 leading-4 mx-1 mb-2 rounded-full text-white lowercase"
      style={{ borderColor: color }}
    >
      <div
        className="w-3 h-3 mr-2 rounded-full"
        style={{ background: color }}
      />
      <span>{title}</span>
    </div>
  )
}

const Home = () => {
  return (
    <>
      <div className="bg-discord-0 py-8 sm:py-10 md:py-12">
        <div className="container">
          <div className="row">
            <div className="col md:w-2/3 lg:w-1/2 text-white">
              <h1 className="text-4xl font-bold mb-4 leading-tight">
                templatename
              </h1>
              <p className="text-discord-600 font-medium text-lg lg:w-5/6">
                templatedescription
              </p>
              <p className="text-discord-600 font-medium text-lg lg:w-5/6">
                27 people using this template
              </p>
              <p className="text-discord-500  font-medium text-lg lg:w-5/6 py-4">
                Made by audn#1580
              </p>
            </div>
            <div className="col md:w-1/3 lg:w-1/2 self-center hidden md:block">
              <div className="text-discord-500 bg-discord-200 mx-auto w-1/2 p-5 rounded-md mb-4">
                <Category title="Category Name" />
                <Channel title="TextChannel" />
                <Category title="Category Name" />
                <Channel title="TextChannel" />
                <Channel title="TextChannel" />
                <Channel title="TextChannel" />
                <Category title="Category Name" />
                <Channel title="TextChannel" />
                <Channel title="TextChannel" />
              </div>
              <div className="text-discord-500 bg-discord-200 mx-auto w-1/2 p-5 rounded-md">
                <div className="flex -mx-1 -mb-2 flex-wrap">
                  <Role color="red" title="admin" />
                  <Role color="blue" title="moderator" />
                  <Role color="green" title="trusted" />
                  <Role color="yellow" title="donator" />
                  <Role color="orange" title="developer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8 sm:py-10 md:py-12">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="text-discord-600 font-medium text-lg pb-8">
                Maybe these ones will help?
              </p>
            </div>
          </div>
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
