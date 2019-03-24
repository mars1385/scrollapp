import React from 'react'

export default function Image({image , toggleModal}) {
  return (
    <img src={image.urls.thumb}
     className="single-photo" alt='' onClick={() =>toggleModal(image.id)}/>
  )
}
