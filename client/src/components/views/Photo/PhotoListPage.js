import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from 'axios';

import { List, Card } from 'antd';

function PhotoListPage(props) {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [offset, setOffset] = useState(0);
    const [photos, setPhotos] = useState([])
    const limit = 9;
    
    async function getPhotoList(){
        return new Promise (async (resolve, reject) => {
            const res = await axios.get(`/api/photos?offset=${offset}&limit=${limit}`);
            resolve(res.data.photos);
        });
    }
    
    //getPhotoList();

    useEffect(()=>{
        console.log('=== useEffect ===');

        const fetchPhotos = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const newPhotos = await getPhotoList();
                setPhotos([...photos, ...newPhotos]);
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        }
        
        fetchPhotos();
    }, [])


    return (
        <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={photos}
            renderItem={(item) => (
                <List.Item>
                    <Card title={item.title}>Card content
                    {item.kind === 'K'?(
                        <img src={`http://localhost:5000/api/photos/thumb/${item.thumbnail_src}`} width="100%"/>
                    ):(
                        <img src={item.thumbnail_src} />
                    )}
                        
                        {/* <img src='https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/115958983_183045763250954_3726624362482906749_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=Dco89qqY5voAX-Ces4-&oh=a62f656d3c73c844a698697a269b9716&oe=5F504B53' width="100%"/> */}
                    </Card>
                </List.Item>
            )}
        />
    );
}

const mapStateToProps = (state /*, ownProps*/) => {
    return { user: state.user };
};
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PhotoListPage));
