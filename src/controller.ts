import { Router, Request, Response, NextFunction } from "express";
import { URLStoreRepository } from "./repository";

export class URLStoreController {
  constructor(private router: Router) {
    this.router = router;
  }

  initController() {
    this.initPostRoutes();
    this.initGetRoutes();
  }

  private initPostRoutes() {
    this.router.post(
      "/shorten",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { url } = req.body;
          const shortenURL = await URLStoreRepository.shortenURL(url);
          res
            .json({
              shorten_url: shortenURL,
            })
            .status(200);
        } catch (error) {
          next(error);
        }
      }
    );
  }

  private initGetRoutes() {
    this.router.get(
      "/:code",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const originalURL = (
            await URLStoreRepository.getOriginalURL(req.params.code)
          ).originalURL;
          res.redirect(originalURL);
        } catch (error) {
          next(error);
        }
      }
    );
  }
}
