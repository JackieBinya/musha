import React, { useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import ReadMoreReact from 'read-more-react';
import { usePropertiesByUserID } from '../hooks';
import { AuthContext } from '../context/auth-context';
import { Loader } from '../components/Loader';
import { ShortProperty } from '../components/ShortProperty';
import { PropertyIcons } from '../components/PropertyIcons';
import { Footer } from '../components/Footer';

/* 
Authenticated users access a form they can use to list a new property
Users get their listed properties by id'
Users can update their properties
*/

export const Properties = ({ history }) => {
  const { path } = useRouteMatch();
  const { currentUser } = useContext(AuthContext);
  const { userProperties } = usePropertiesByUserID(currentUser.uid);

  return (
    <div className="generic-wrapper">
      <main className="container" style={{ marginBottom: '6em' }}>
        <div className="container-inner">
          <h1>Properties</h1>
          {userProperties === null ? (
            <Loader />
          ) : userProperties.length === 0 ? (
            <p>
              Ooops! No properties found, start posting property ads for free.
            </p>
          ) : userProperties.length > 0 ? (
            <div>
              <div>
                {userProperties.map(
                  ({
                    city,
                    location,
                    imageUrls,
                    numberOfBathrooms,
                    numberOfBedrooms,
                    title,
                    description,
                    id,
                  }) => (
                    <div key={id} className="my-properties">
                      <h2>{title ? title : `New property in ${location}`}</h2>
                      <ShortProperty imageUrls={imageUrls}>
                        <h3 className="property-id">Property ID: {id}</h3>

                        <div style={{ padding: '1em' }}>
                          {/* The wrapper div is temp style the imported component using classes */}
                          <ReadMoreReact
                            text={description}
                            min={55}
                            ideal={80}
                            max={300}
                            readMoreText="Read more"
                          />
                        </div>
                        <PropertyIcons
                          id={id}
                          city={city}
                          location={location}
                          numberOfBathrooms={numberOfBathrooms}
                          numberOfBedrooms={numberOfBedrooms}
                          user={currentUser}
                          path={path}
                        />
                      </ShortProperty>
                    </div>
                  )
                )}
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </main>
      <Footer
        lock={
          userProperties === null || userProperties.length === 0 ? 'lock' : ''
        }
      />
    </div>
  );
};
