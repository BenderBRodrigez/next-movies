import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./button";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import { ImageUpload } from "./image-upload";
import { MovieDto } from "../dto/movie.dto";

interface MovieFormData {
  title: string;
  publishingYear: number;
}

type MovieFormProps = {
  submitForm: (formData: FormData) => void;
  data?: MovieFormData & { posterUrl?: string };
};

export const MovieForm = ({ submitForm, data }: MovieFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<MovieFormData>({ resolver: classValidatorResolver(MovieDto) });
  const [file, setFile] = useState<File>();

  const onCancel = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      router.back();
    },
    [router]
  );

  const onSubmit = useCallback(
    ({ title, publishingYear }: MovieFormData) => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("publishingYear", publishingYear.toString());
      if (file) {
        formData.append("file", file);
      }
      submitForm(formData);
    },
    [file, submitForm]
  );

  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("publishingYear", data.publishingYear);
    }
  }, [data, setValue]);

  useEffect(() => {
    if (!isEmpty(errors)) {
      Object.values(errors).forEach((value) => {
        toast.error(value.message);
      });
    }
  }, [errors]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-3 gap-6 sm:gap-y-16"
    >
      <div className="flex flex-1 flex-col gap-6 sm:gap-4 sm:max-w-[362px] sm:order-1">
        <input
          type="text"
          className="w-full h-12 p-4 rounded-lg bg-input"
          placeholder="Title"
          {...register("title")}
        />
        <input
          type="number"
          className="w-full sm:max-w-[216px] h-12 p-4 rounded-lg bg-input"
          placeholder="Publishing year"
          {...register("publishingYear")}
        />
      </div>
      <ImageUpload
        className="sm:order-0 sm:row-span-3"
        url={data?.posterUrl}
        file={file}
        setFile={setFile}
      />
      <div className="flex gap-4 max-sm:mt-4 sm:order-1 sm:max-w-[362px]">
        <Button className="flex-1 bg-transparent border" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          Submit
        </Button>
      </div>
    </form>
  );
};
