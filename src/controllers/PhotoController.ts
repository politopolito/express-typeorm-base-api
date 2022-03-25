import { IController } from "../types/IController";
import PhotoService from "../services/PhotoService";
import { IRequestHandler } from "../types/IRequestHandler";
import Photo from "../entities/Photo";
import { PhotoDto, PhotoMapper } from "../mappers/PhotoMapper";
import { PhotoGetRequest } from "../types/Photo/PhotoGetRequest";
import { IMapper } from "../mappers/IMapper";

/**
 * Handle HTTP requests for Photos
 */
class PhotoController implements IController {
  /**
   * Handles all business logic related to Photo entity
   * @private
   */
  private readonly photoService;

  /**
   * Handles mapping photo to dto
   * @private
   */
  private readonly photoMapper;

  /**
   * Constructor allows for dependency injection of service
   * @param photoService
   * @param photoMapper
   */
  constructor(
    photoService: PhotoService = new PhotoService(),
    photoMapper: IMapper<Photo, PhotoDto> = new PhotoMapper(),
  ) {
    this.photoService = photoService;
    this.photoMapper = photoMapper;
  }

  /**
   * Gets photo by id
   * Success: entity json
   * @param req
   * @param res
   */
  public getById: IRequestHandler<PhotoGetRequest> = async (req, res) => {
    const { withUserId } = req.query;
    const photo = await this.photoService.getById(
      Number(req.params.id),
      { withUserId: withUserId === "true" },
    );
    res.status(200).json({ data: this.photoMapper.toDto(photo) });
  };

  /**
   * Creates photo
   * Success: 201 & new entity json
   * @param req
   * @param res
   */
  public create: IRequestHandler = async (req, res) => {
    const photo = await this.photoService.create(req.body);
    res.status(201).json({ data: this.photoMapper.toDto(photo) });
  };

  /**
   * Updates photo by id
   * Success: 200 & updated entity json.
   * @param req
   * @param res
   */
  public updateById: IRequestHandler = async (req, res) => {
    const photoUpdatePayload = req.body;
    const photo = await this.photoService.updateById(Number(req.params.id), photoUpdatePayload);
    res.status(200).json({ data: this.photoMapper.toDto(photo) });
  };

  /**
   * Deletes photo by id
   * Success: 204.
   * @param req
   * @param res
   */
  public deleteById: IRequestHandler = async (req, res) => {
    await this.photoService.deleteById(Number(req.params.id));
    res.sendStatus(204);
  };
}

export default PhotoController;
