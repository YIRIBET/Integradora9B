import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/templates/')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setTemplates(data.data);
        }
      })
      .catch((error) => console.error('Error al cargar las plantillas:', error));
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a HACETS</h1>
        <p className="text-lg text-gray-600 mb-6">
          Crea hermosas invitaciones digitales que hagan que cada evento sea memorable.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-6">
        {templates.map((template) => (
          <div
            key={template.id_templates}
            className="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <Link 
              to={`/templates/${template.id_templates}`} 
              className="block aspect-video overflow-hidden"
            >
              <img
                className="w-full h-full object-cover"
                src={template.image}
                alt={template.template_name}
              />
            </Link>
            <div className="px-4 py-3">
              <h5 className="text-lg text-start tracking-tight text-gray-900 dark:text-white">
                {template.template_name}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;