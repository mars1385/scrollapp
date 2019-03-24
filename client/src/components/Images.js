import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import Image from './Image';

export default class Images extends Component {
    //......
    state = {
        images: [],
        countImage: 20,
        startImage: 1,
    }

    //getting images from server
    fetchImage = (startImage , countImage) => {
        axios.get(`/api/images?startImage=${startImage}&countImage=${countImage}`)
        .then(res => this.setState({images :  this.state.images.concat(res.data)}))
    }
    //getting first group of images
    componentDidMount(){
        const {countImage , startImage} = this.state;
        this.fetchImage( startImage , countImage);      
    }

    fetchNewImages = () =>{
        //changing state
        this.setState(
        {startImage : this.state.startImage + this.state.countImage});
        console.log(this.state.startImage )
        //getting new images
        const {countImage , startImage} = this.state;
        this.fetchImage( startImage , countImage);     
    }
    render() {
        const {images } = this.state;
        return (
            <div className="images">
                <InfiniteScroll
                    dataLength={images.length}
                    next={this.fetchNewImages}
                    hasMore={true}
                    loader={<h2 className="is-2">Loading...</h2>}>
                    {images.map(image => (
                        <Image key={image.id} image={image} toggleModal={this.toggleModal}/>
                    ))}
                </InfiniteScroll>   
            </div>
        )
  }
}
