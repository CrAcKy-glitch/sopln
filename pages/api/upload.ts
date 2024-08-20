import { NextApiRequest, NextApiResponse } from "next";
import multiparty from "multiparty";
import Bucket from "@app/aws-config/media-storage";
import { initMongoose } from "@app/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import User from "@app/lib/models/user";
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await initMongoose();
  const session = await getServerSession(req, res, authOptions);
  const form = new multiparty.Form({});

  form.parse(req, async (err, fields, files) => {
    if (err) {
      throw err;
    }
    const fileInfo = files["cover"][0];
    const fileName = session?.user.id as string;

    const upload = await Bucket({ fileinfo: fileInfo, key: fileName });
    const user = await User.findByIdAndUpdate(session?.user?.id, {
      cover: upload.location,
    });
    res.json({ files, upload });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
