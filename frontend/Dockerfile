# Use a lightweight Nginx image to serve static files
FROM nginx:alpine

# Copy all static assets into the Nginx public directory
COPY . /usr/share/nginx/html

# Expose default Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]