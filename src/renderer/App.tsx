import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { PrismaClient } from '@prisma/client';

try {
  const prisma = new PrismaClient();
  prisma.user.findMany().then((users) => console.log(users));
} catch (error) {}

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const App = () => {
  return <h1>Hi from a react app 123</h1>;
};

ReactDom.render(<App />, mainElement);
