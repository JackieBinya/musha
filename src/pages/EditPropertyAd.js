import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firebase } from '../firebase';
import { useProperty } from '../hooks';

import { PropertyEditForm } from '../components/Property-Form-Edit';
import { Loader } from '../components/Loader';

export const EditPropertyAds = () => <PropertyEditForm />;
