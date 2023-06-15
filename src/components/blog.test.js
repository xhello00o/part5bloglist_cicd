import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

describe('Tests for Blog', () => {
  test(`renders the blog's title and author, but does not render its URL or number of likes by default`, () => {
    const blog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    }

    render(<Blog blog={blog} />)

    const elementUrl = screen.queryByText('url:')
    const elementlikes = screen.queryByText('likes:')

    expect(elementUrl).toBeNull()
    expect(elementlikes).toBeNull()

  })

  test(`blog's URL and number of likes are shown when the button controlling the shown details has been clicked.`,
    async () => {
      const blog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        user:{ name: 'Me' }
      }

      render(<Blog blog={blog} />)
      const user = userEvent.setup()
      const button = screen.getByText('view')
      await user.click(button)

      const elementUrl = screen.queryByText('url:')
      const elementlikes = screen.queryByText('likes:')

      expect(elementUrl).toBeDefined()
      expect(elementlikes).toBeDefined

    }
  )

  test(`if the like button is clicked twice, the event handler the component received as props is called twice`,
    async () => {
      const blog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        user:{ name: 'Me' }
      }

      const mockHandler = jest.fn()

      render(<Blog blog={blog} addLike={mockHandler}/>)
      const user = userEvent.setup()

      const button = screen.getByText('view')
      await user.click(button)

      const likeButton = screen.getByText('like')
      await user.dblClick(likeButton)

      const elementUrl = screen.queryByText('url:')
      const elementlikes = screen.queryByText('likes:')

      expect(elementUrl).toBeDefined()
      expect(elementlikes).toBeDefined()
      expect(mockHandler.mock.calls).toHaveLength(2)


    }
  )

})

describe('tests for BlogForm', () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
  }
  test(` the form calls the event handler it received as props with the right details when a new blog is created`, async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render (<CreateBlog createblogreq={createBlog} />)
    const tileinput = screen.getByPlaceholderText('e.g The Little Red Riding Hood...')
    const authorinput = screen.getByPlaceholderText('Name like Ronald McDonalds...')
    const urlinput = screen.getByPlaceholderText('www.readabook.com...')
    const createButton  = screen.getByText('Create')


    await user.type(tileinput,blog.title)
    await user.type(authorinput,blog.author)
    await user.type(urlinput,blog.url)
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    console.log(createBlog.mock.calls)
    expect(createBlog.mock.calls[0][0]).toMatchObject(blog)

  })
})

