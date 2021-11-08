 void main(){
     vec3 newPosition = position;
    
                gl_Position = projectionMatrix * modelViewMatrix * vec4(
                    position,1.0
                );
            }