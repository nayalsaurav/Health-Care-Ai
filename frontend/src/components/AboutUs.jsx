import { Testimonials } from "./ui/testimonials";

const testimonials = [
  {
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "I'm blown away by the versatility of the components in this library. They make UI development a breeze!",
    name: "Saurav Nayal",
    username: "nayalsaurav@gmail.com",
    social: "https://i.imgur.com/VRtqhGC.png",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "Using this component library has significantly speed up our development process. The quality and ease of integration are remarkable!",
    name: "Samarjeet Singh",
    username: "singhsamarjeet0987@gmail.com",
    social: "https://i.imgur.com/VRtqhGC.png",
  },
  {
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "The components in this library are not just well-designed but also highly customizable. It's a developer's dream!",
    name: "Jai Goyal",
    username: "jaigoel@gmail.com",
    social: "https://i.imgur.com/VRtqhGC.png",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "The components in this library are not just well-designed but also highly customizable. It's a developer's dream!",
    name: "Anurag",
    username: "anuveer44@gmail.com",
    social: "https://i.imgur.com/VRtqhGC.png",
  },
];

export default function AboutUs() {
  return (
    <div className="container py-10">
      <Testimonials testimonials={testimonials} />
    </div>
  );
}
